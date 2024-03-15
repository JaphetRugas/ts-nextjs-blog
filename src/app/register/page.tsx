import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Form from "./form";

export default async function Register() {
  const session = await getServerSession();
  if (session) {
    redirect("/dashboard");
  }

  return <Form />;
}
