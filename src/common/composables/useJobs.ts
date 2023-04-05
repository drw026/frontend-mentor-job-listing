import { ref } from 'vue';
import type { Ref } from 'vue';
import { timer, sleep } from '../helpers';

type Job = {
  id: string,
  company: string,
  contract: string,
  featuredLabel: boolean,
  languages: string[],
  level: string,
  location: string,
  logo: string,
  newLabel: boolean,
  position: string,
  role: string,
  postedAt: string,
}

export default function useJobs() {
  const jobs: Ref<Job[]> = ref([]);
  const isLoading = ref(false);
  const fetchTime = timer();

  const fetchJobs = async () => {
    fetchTime.start();
    isLoading.value = true;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_FIREBASE_URL}/jobs.json`,
      );
      const data = await response.json();
      const stopTime = fetchTime.stop();

      if (!response.ok) throw new Error('Response not OK');
      if (stopTime < 500) await sleep(500 - stopTime);

      isLoading.value = false;
      jobs.value = Object.keys(data).map((id) => ({ ...data[id], id }));
    } catch (error) {
      console.error(error);
      isLoading.value = false;
    }
  };

  fetchJobs();

  return {
    jobs,
    isLoading
  };
}
