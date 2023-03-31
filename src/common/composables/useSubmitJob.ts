import { ref } from 'vue';
import { timer, sleep } from '../helpers';
import { readCookie } from '../helpers';

export default function useSubmitJob() {
  const isLoading = ref(false);
  const isSuccess = ref(false);
  const error = ref('');
  const company = ref('');
  const contract = ref('');
  const featuredLabel = ref(false);
  const languages = ref([]);
  const level = ref('');
  const location = ref('');
  const logo = ref('');
  const newLabel = ref(false);
  const position = ref('');
  const role = ref('');

  const submitJob = async () => {
    const accessToken = readCookie('accessToken');
    const fetchTime = timer();

    fetchTime.start();
    isLoading.value = true;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_FIREBASE_URL}/jobs.json?auth=${accessToken}`,
        {
          method: 'POST',
          body: JSON.stringify({
            company: company.value,
            contract: contract.value,
            featured: featuredLabel.value,
            languages: languages.value,
            level: level.value,
            location: location.value,
            logo: logo.value,
            new: newLabel.value,
            position: position.value,
            postedAt: new Date().toISOString(),
            role: role.value,
          }),
        },
      );

      const stopTime = fetchTime.stop();

      if (!response.ok) throw new Error('Response not ok');
      if (stopTime < 1000) await sleep(1000 - stopTime);

      isLoading.value = false;
      isSuccess.value = true;
    } catch (error) {
      error.value = error;
      isLoading.value = false;
      console.log(error);
    }
  };

  const resetJobForm = () => {
    isLoading.value = false;
    isSuccess.value = false;
    error.value = '';
    company.value = '';
    contract.value = '';
    featuredLabel.value = false;
    languages.value = [];
    level.value = '';
    location.value = '';
    logo.value = '';
    newLabel.value = false;
    position.value = '';
    role.value = '';
  };

  return {
    isLoading,
    isSuccess,
    company,
    contract,
    featuredLabel,
    level,
    newLabel,
    position,
    role,
    error,
    languages,
    logo,
    location,
    submitJob,
    resetJobForm,
  };
}
