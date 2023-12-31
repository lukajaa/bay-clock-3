<template>
  <div
    class="flex flex-col justify-between text-5xl font-bold md:flex-row md:px-2 md:pt-2 md:text-6xl"
  >
    <div v-if="showClock" class="flex flex-row tracking-tighter md:flex-col">
      {{ clock }}
    </div>
    <div v-if="showStatus" class="flex flex-row tracking-tight md:flex-col">
      {{ statusMessage }}
    </div>
  </div>
  <div
    class="flex flex-col justify-between text-3xl font-bold tracking-tight text-gray-600 dark:text-gray-400 md:flex-row md:px-2 md:text-4xl"
  >
    <div v-if="showDate" class="flex-row md:flex-col">{{ date }}</div>
    <div
      v-if="scheduleStore.isSpecialSchedule && showIndicator"
      class="flex-row md:flex-col"
    >
      SPECIAL SCHEDULE
    </div>
    <div
      v-else-if="scheduleStore.isBreak && showIndicator"
      class="flex-row md:flex-col"
    >
      {{ scheduleStore.daysLeft }} days left
    </div>
  </div>
</template>

<script setup lang="ts">
import { useScheduleStore } from '~/stores/schedule';
import { useStylesStore } from '~/stores/styles';
import { useNowStore } from '~/stores/now';

const nowStore = useNowStore();
const { time } = storeToRefs(nowStore);
const { updateTimeLoop } = nowStore;

onMounted(() => {
  updateTimeLoop();
});

const clock = useDateFormat(time, 'h:mm:ss A');
const date = useDateFormat(time, 'ddd MMMM D YYYY');
const scheduleStore = useScheduleStore();
const stylesStore = useStylesStore();
const { schedule } = storeToRefs(scheduleStore);
const { showClock, showStatus, showDate, showIndicator, useDetailedTime } =
  storeToRefs(stylesStore);

const statusMessage = computed(() => {
  const timeNum = time.value.getTime();
  if (scheduleStore.isBreak) {
    return scheduleStore.breakName;
  }
  if (scheduleStore.isWeekend) {
    return 'Weekend';
  }
  const schoolStartTime = Object.values(schedule.value)[0].start;
  const schoolEndTime = Object.values(schedule.value).reduce(
    (acc, curr) => Math.max(acc, curr.end),
    0,
  );
  if (timeNum < schoolStartTime) {
    return `School starts in ${Math.floor(
      (schoolStartTime - timeNum) / 1000 / 60,
    )} minutes`;
  }
  if (timeNum > schoolEndTime) {
    return 'School is over';
  }
  for (const timeframe of Object.values(schedule.value)) {
    if (timeNum >= timeframe.start && timeNum <= timeframe.end) {
      if (useDetailedTime.value) {
        const timeLeft = timeframe.end - timeNum;
        const hours =
          Math.floor(timeLeft / 1000 / 60 / 60) > 0
            ? `${Math.floor(timeLeft / 1000 / 60 / 60)}:`
            : '';
        const minutes = hours
          ? Math.floor((timeLeft / 1000 / 60) % 60)
              .toString()
              .padStart(2, '0')
          : Math.floor((timeLeft / 1000 / 60) % 60).toString();
        const seconds = Math.floor((timeLeft / 1000) % 60)
          .toString()
          .padStart(2, '0');

        return `${hours}${minutes}:${seconds} left`;
      } else {
        return `${Math.ceil(
          (timeframe.end - timeNum) / 1000 / 60,
        )} minutes left`;
      }
    }
  }
  return 'Passing';
});

useHead({
  titleTemplate: statusMessage,
});
</script>
