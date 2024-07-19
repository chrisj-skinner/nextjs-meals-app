'use client';

export default function Error(/* could use props passed by default from Next.js { error} */) {
  return (
    <main className='error'>
      <h1>An error occured!</h1>
      <p>Failed to fetch meals. Please try again later.</p>
    </main>
  );
}
