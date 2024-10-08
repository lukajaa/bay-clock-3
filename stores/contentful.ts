import regularScheduleJSON from '~/assets/data/regular_schedule.json';
import specialSchedulesJSON from '~/assets/data/special_schedules.json';
import immersiveScheduleJSON from '~/assets/data/immersive_schedule.json';
import activityScheduleJSON from '~/assets/data/activity_schedule.json';
import breaksJSON from '~/assets/data/breaks.json';
import usefulLinksJSON from '~/assets/data/useful_links.json';

export const useContentfulStore = defineStore('contentful', () => {
  const activitySchedule = ref(activityScheduleJSON);
  const breaks = ref(breaksJSON);
  const specialSchedules = ref(specialSchedulesJSON);
  const immersiveSchedule = ref(immersiveScheduleJSON);
  const regularSchedule = ref(regularScheduleJSON);
  const usefulLinks = ref(usefulLinksJSON);
  const menuImages = ref([]);
  async function loadSpace() {
    const { data: space } = await useFetch('/api/contentful');
    if (space.value.sys.type === 'Error') {
      return;
    }
    activitySchedule.value = space.value.items.find(item => item.sys.id === '42Z0UUEUxuVBkEpE4pdL24').fields.schedule;
    breaks.value = space.value.items.find(item => item.sys.id === '3BWYUhVpaGVuvTZknDIlSq').fields.schedule;
    specialSchedules.value = space.value.items.find(item => item.sys.id === '23iKtUXKRVwiW8wIQXqLtO').fields.schedule;
    immersiveSchedule.value = space.value.items.find(item => item.sys.id === '4tyj0EtnaOuSnHJEmoe0Bn').fields.schedule;
    regularSchedule.value = space.value.items.find(item => item.sys.id === '54Vls3YjBcSgpLFIwfZMZs').fields.schedule;
    usefulLinks.value = space.value.items.find(item => item.sys.id === '1b1iVmwM8MysluXn52ek1c').fields.schedule;
    const menu = space.value.items.find(item => item.sys.id === '7lGYtrHU7fBiumTMjY68GE').fields.images;
    menuImages.value = [];
    for (const asset of menu) {
      const image = space.value.includes.Asset.find(a => a.sys.id === asset.sys.id);
      menuImages.value.push(image.fields.file.url);
    }
  }

  return {
    activitySchedule,
    breaks,
    specialSchedules,
    immersiveSchedule,
    regularSchedule,
    menuImages,
    usefulLinks,
    loadSpace,
  };
});
