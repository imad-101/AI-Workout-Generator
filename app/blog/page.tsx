// app/blog/page.tsx
import Link from "next/link";

export default async function BlogHome() {
  // Replace this with your data fetching logic (e.g., calling an API)
  const posts = await fetchPosts();

  return (
    <div className="h-screen mt-20">
      <h2 className="text-white text-4xl text-center">Blog Posts</h2>
      <ul>
        {posts.map((post: any) => (
          <li key={post.id}>
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Dummy function – replace with your actual data fetching
async function fetchPosts() {
  return [
    { id: 1, title: "First Post", slug: "first-post" },
    { id: 2, title: "Second Post", slug: "second-post" },
  ];
}
