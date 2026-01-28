'use server';

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function normalizePhone(phone: string) {
    const digits = phone.replace(/\D/g, '');
    if (!digits) return null;
    if (digits.length !== 10) throw new Error('Phone number must be 10 digits.');
    return digits;
}

export async function registerAction(_: unknown, formData: FormData) {
    const firstName = String(formData.get('firstName') ?? '').trim();
    const lastName = String(formData.get('lastName') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim();
    const phoneRaw = String(formData.get('phone') ?? '').trim();
    const password = String(formData.get('password') ?? '').trim();
    const confirm_pass = String(formData.get('confirmPassword') ?? '').trim();
    
    if (!firstName || !lastName) return { error: 'First and last name are required.' };
    if (!email) return { error: 'Email is required' };
    if (password.length < 8) return { error: 'Password must be at least 8 characters.' };
    if (password !== confirm_pass) return { error: 'Passwords do not match.' };

    let phone: string | null = null;
    try {
        phone = normalizePhone(phoneRaw);
    } catch (e: any) {
        return { error: e.message ?? 'Invalid phone number.' };
    }

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
        email, 
        password,
        options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
            data: { first_name: firstName, last_name: lastName },
        },
    });

    if (error) return { error: error.message };

    const userId = data.user?.id;
    if (userId) {
        const { error: profileErr } = await supabase
            .from('profiles')
            .insert({ id: userId, first_name: firstName, last_name: lastName, phone });
        if (profileErr) return { error: profileErr.message };
    }

    redirect('/')
}