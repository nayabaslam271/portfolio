const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function fetchProjects() {
  const res = await fetch(`${API_URL}/api/projects`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export async function fetchFeaturedProjects() {
  const res = await fetch(`${API_URL}/api/projects/featured`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch featured projects");
  return res.json();
}

export async function fetchProjectBySlug(slug: string) {
  const res = await fetch(`${API_URL}/api/projects/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch project");
  return res.json();
}

export async function fetchTestimonials() {
  const res = await fetch(`${API_URL}/api/testimonials`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch testimonials");
  return res.json();
}

export async function submitContact(data: unknown) {
  const res = await fetch(`${API_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to submit contact form");
  return res.json();
}
