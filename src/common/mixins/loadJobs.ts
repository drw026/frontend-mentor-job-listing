import { timer, sleep } from '../helpers';
export default {
  data() {
    return {
      jobs: [],
      isLoading: false,
    }
  },
  methods: {
    async loadJobs() {
      const fetchTime = timer();
      fetchTime.start();
      this.isLoading = true;

      try {
        const response = await fetch(
          `${import.meta.env.VITE_FIREBASE_URL}/jobs.json`,
        );
        const data = await response.json();
        const stopTime = fetchTime.stop();

        if (!response.ok) throw new Error('Response not OK');
        if (stopTime < 500) await sleep(500 - stopTime);

        this.isLoading = false;
        this.jobs = Object.keys(data).map((id) => ({ ...data[id], id }));
      } catch (error) {
        console.error(error);
        this.isLoading = false;
      }
    },
  },
};
