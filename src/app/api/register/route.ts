import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcrypt';  
import { db } from "@/lib/db";
import { registerSchemaValidation } from '@/lib/validationSchemas';
 
const defaultProfilePic = "/userprofilepics/Salem.svg";
 
export async function POST(req: NextRequest) {
    try {
        const body = await req.json(); 
        const { email, firstName, lastName, password, confirmPassword, birthday } = body; 

        const validation = registerSchemaValidation.safeParse(body);

        if (!validation.success) {
            const errorMessage = validation.error.errors[0].message;
            return NextResponse.json({ message: errorMessage }, { status: 400 });
        }
 
        if (password !== confirmPassword) {  
            return NextResponse.json({ user: null, message: "Passwords do not match" }, { status: 400 })
        }
 
        const existingUserByEmail = await db.user.findUnique({
            where: {email: email}
        });

        if(existingUserByEmail) {
            return NextResponse.json({ user: null, message: "User with this email already exists" }, { status: 409 })
        }  

        const HashPassword = await hash(password, 10)

        const newUser = await db.user.create({
            data: {
                email,
                firstName,
                lastName,
                birthday: new Date(birthday),
                password: HashPassword,
                profilePic: defaultProfilePic 
            }
        })
 
        const { password: newUserPassword, ...rest } = newUser

        return NextResponse.json({ user: rest, message: "User created successfully" }, { status: 201});
    } catch(error) {
        return NextResponse.json({ message: "Something went wrong!" }, { status: 500})
    }
}