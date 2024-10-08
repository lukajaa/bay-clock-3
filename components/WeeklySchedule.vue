<template>
  <div>
    <UButton
      :ui="buttonUIs.weekly"
      label="Weekly Schedule"
      @click="isOpen = true"
    />
    <UModal
      v-model="isOpen"
      :ui="{
        width: 'sm:max-w-7xl',
        container: 'items-center',
      }"
    >
      <div
        class="flex min-h-[384px] w-full flex-row gap-4 overflow-x-scroll p-8"
      >
        <div
          v-for="(schedule, day) of weeklySchedule"
          :key="day"
          class="flex w-2/3 min-w-48 flex-col gap-4 md:w-1/5"
        >
          <p class="text-center text-2xl font-semibold">
            {{ day }}
          </p>
          <div
            v-for="(timeframe, block) of schedule"
            :key="block"
            class="h-28 w-full rounded-lg pl-2 pt-1"
            :class="colorKey[block]"
          >
            <p
              v-if="isImmersive && (block.slice(0, 6) === 'REMOVE' || block.slice(0, 6) === 'DELETE')"
              class="text-xl font-semibold md:text-2xl"
            >
              {{ block.slice(6) }}
            </p>
            <p
              v-else
              class="text-lg font-semibold md:text-xl"
            >
              {{ block }}
            </p>
            <div class="text-lg font-semibold md:text-xl">
              <p v-if="timeframe.start === '0:00' && timeframe.end === '11:59'">
                All Day
              </p>
              <p v-else>
                {{ timeframe.start }} - {{ timeframe.end }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </UModal>
  </div>
</template>

<script setup lang="ts">
import { useContentfulStore } from '~/stores/contentful';
import { useStylesStore } from '~/stores/styles';
import { useCustomScheduleStore } from '~/stores/customSchedule';
import { useNowStore } from '~/stores/now';

const stylesStore = useStylesStore();
const { buttonUIs } = storeToRefs(stylesStore);
const contentfulStore = useContentfulStore();
const { breaks, specialSchedules, immersiveSchedule, regularSchedule } = storeToRefs(contentfulStore);

const customScheduleStore = useCustomScheduleStore();
const nowStore = useNowStore();
const {
  blockNames,
  clubs,
  activityDays,
  activitySchedule,
  activityName,
  immersiveName,
  hasSpecialFlex,
  flexBlock,
  specialFlexDay,
  specialFlexName,
  customSpecialFlexName,
  advisoryDay,
  showOneOnOnes,
} = storeToRefs(customScheduleStore);
const { time } = storeToRefs(nowStore);

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const colors = [
  'bg-blue-500',
  'bg-red-500',
  'bg-yellow-500',
  'bg-green-500',
  'bg-purple-500',
  'bg-orange-500',
  'bg-pink-500',
  'bg-indigo-500',
  'bg-cyan-500',
  'bg-lime-500',
  'bg-rose-500',
  'bg-teal-400',
  'bg-fuchsia-400',
  'bg-amber-400',
  'bg-emerald-400',
  'bg-violet-400',
];

const colorKey = ref({}) as Ref<Record<string, string>>;
const colorKeyIndex = ref(0);

const isImmersive = ref(false);

const weeklySchedule = computed(() => {
  const output = {} as Record<
    string,
    Record<
      string,
      {
        start: string
        end: string
      }
    >
  >;
  for (const dayOfWeek of days) {
    const dayDate = new Date(time.value);
    const today = dayDate.getDay();
    const diff = dayDate.getDate() - today + days.indexOf(dayOfWeek) + 1;
    dayDate.setDate(diff);

    const day = useDateFormat(dayDate, 'dddd');
    let isBreak = false;
    let unparsedSchedule: Record<
      string,
      {
        start: { hour: number, minute: number }
        end: { hour: number, minute: number }
      }
    > = {};

    // load regular schedule
    for (const [name, timeframe] of Object.entries(
      regularSchedule.value[day.value],
    )) {
      if (name === 'Group Advisory/1-on-1s') {
        if (!advisoryDay.value) {
          unparsedSchedule[name] = timeframe;
        }
        else if (day.value === advisoryDay.value) {
          unparsedSchedule['Group Advisory'] = timeframe;
        }
        else if (showOneOnOnes.value === 'Yes') {
          unparsedSchedule['Advisor 1-on-1'] = timeframe;
        }
      }
      else if (name === flexBlock.value) {
        if (
          hasSpecialFlex.value === 'Yes'
          && day.value === specialFlexDay.value
        ) {
          unparsedSchedule[
            customSpecialFlexName.value || specialFlexName.value
          ] = timeframe;
        }
        else {
          unparsedSchedule[name] = timeframe;
        }
      }
      else {
        unparsedSchedule[name] = timeframe;
      }
    }

    // check for special schedule
    for (const [date, specialSchedule] of Object.entries(specialSchedules.value)) {
      const specialScheduleDate = new Date(date);
      if (dayDate.toDateString() === specialScheduleDate.toDateString()) {
        unparsedSchedule = specialSchedule;
      }
    }

    // check for immersives
    for (const date of immersiveSchedule.value.dates) {
      const startDate = new Date(date.start);
      const endDate = new Date(date.end);
      if (dayDate >= startDate && dayDate <= endDate) {
        unparsedSchedule = immersiveSchedule.value.schedule;
        isImmersive.value = true;
      }
    }

    // check for breaks
    for (const [name, timeframe] of Object.entries(breaks.value)) {
      const breakStart = new Date(timeframe.start);
      const breakEnd = new Date(timeframe.end);
      if (dayDate >= breakStart && dayDate <= breakEnd) {
        unparsedSchedule = {
          [name]: {
            start: {
              hour: 0,
              minute: 0,
            },
            end: {
              hour: 23,
              minute: 59,
            },
          },
        };
        isBreak = true;
      }
    }

    // convert schedule to timestamps
    const parsedSchedule: Record<
      string,
      {
        start: string
        end: string
      }
    > = {};
    for (const [block, timeframe] of Object.entries(unparsedSchedule)) {
      let blockName = block;
      if (blockNames.value[blockName]) {
        blockName = blockNames.value[blockName];
      }
      else if (blockName === 'Lunch') {
        if (clubs.value[day.value]) {
          blockName = clubs.value[day.value];
        }
      }
      else if (
        (blockName === 'Immersive Morning'
        || blockName === 'Immersive Afternoon')
        && immersiveName.value
      ) {
        blockName = immersiveName.value;
      }
      parsedSchedule[blockName] = {
        start: `${
          timeframe.start.hour > 12
            ? timeframe.start.hour - 12
            : timeframe.start.hour
        }:${timeframe.start.minute.toString().padStart(2, '0')}`,
        end: `${
          timeframe.end.hour > 12 ? timeframe.end.hour - 12 : timeframe.end.hour
        }:${timeframe.end.minute.toString().padStart(2, '0')}`,
      };
      if (!colorKey.value[blockName]) {
        colorKey.value[blockName] = colors[colorKeyIndex.value];
        colorKeyIndex.value++;
      }
    }

    // check for activities
    if (activityDays.value[day.value] && !isBreak) {
      parsedSchedule[activityName.value || 'Activities + Sports/Drama'] = {
        start: `${
          Number(activitySchedule.value[day.value].start.split(':')[0]) > 12
            ? Number(activitySchedule.value[day.value].start.split(':')[0]) - 12
            : Number(activitySchedule.value[day.value].start.split(':')[0])
        }:${activitySchedule.value[day.value].start.split(':')[1].padStart(2, '0')}`,
        end: `${
          Number(activitySchedule.value[day.value].end.split(':')[0]) > 12
            ? Number(activitySchedule.value[day.value].end.split(':')[0]) - 12
            : Number(activitySchedule.value[day.value].end.split(':')[0])
        }:${activitySchedule.value[day.value].end.split(':')[1].padStart(2, '0')}`,
      };
      if (!colorKey.value[activityName.value || 'Activities + Sports/Drama']) {
        colorKey.value[activityName.value || 'Activities + Sports/Drama']
          = colors[colorKeyIndex.value];
        colorKeyIndex.value++;
      }
    }
    output[dayOfWeek] = parsedSchedule;
  }
  return output;
}) as ComputedRef<
  Record<
    string,
    Record<
      string,
      {
        start: string
        end: string
      }
    >
  >
>;

const isOpen = ref(false);
</script>
