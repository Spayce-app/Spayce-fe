const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function signupUser(data: { email: string; password: string,role:string }) {
  const res = await fetch(`${BASE_URL}/auth/signup`, { 
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "Signup failed");
  }

  return res.json();
}

export async function loginUser (data:{email:string; password:string}) {
    const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Login failed");
      }

      return res.json();
}
