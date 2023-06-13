import Cards from '@/components/Cards/Cards';
import styles from './page.module.scss';

export default function Home() {
  return (
    <main className={styles.main}>
      <Cards />
    </main>
  );
}
