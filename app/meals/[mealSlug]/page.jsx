import Image from 'next/image';

import { notFound } from 'next/navigation';
import { getMealBySlug } from '@/lib/meals';
import classes from './page.module.css';

export async function generateMetadata({ params }) {
  const meal = getMealBySlug(params.mealSlug);

  if (!meal) {
    notFound(); // call the notFound function to return the closest 404/not-found page
  }

  return {
    title: meal.title,
    description: meal.summary,
  };
}

export default function MealDetailsPage({ params }) {
  const meal = getMealBySlug(params.mealSlug);

  if (!meal) {
    notFound();
  }

  meal.instructions = meal.instructions.replace(/\n/g, '<br />');

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image
            src={process.env.AWS_BUCKET_URL + '/' + meal.image}
            alt={meal.title}
            fill
          />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by
            <a href={`mailto:${meal.creator.email}`}> {meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{ __html: meal.instructions }}
        ></p>
      </main>
    </>
  );
}
