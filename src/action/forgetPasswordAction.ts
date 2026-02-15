"use server";
export async function forgetPasswordAction(email: string) {
  const res = await fetch(`${process.env.BASE_URL}/auth/forgotPasswords`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  const data = await res.json();

  return data;
}

export async function verifyCodeAction(resetCode: string) {
  const res = await fetch(`${process.env.BASE_URL}/auth/verifyResetCode`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ resetCode }),
  });
  const data = await res.json();

  return data;
}

export async function resetPasswordAction(email: string, newPassword: string) {
  const res = await fetch(`${process.env.BASE_URL}/auth/resetPassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, newPassword }),
  });
  const data = await res.json();
  console.log(data);

  return data;
}
