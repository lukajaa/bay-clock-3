<template>
  <div class="mx-auto py-8 text-center text-lg">
    <p>
      Created by
      <a
        href="https://www.lucaskchang.com/"
        target="_blank"
        rel="noopener noreferrer"
        class="font-semibold text-blue-400 hover:text-blue-500"
      >
        Lucas Chang
      </a>
    </p>
    <p>
      <!-- <a
        class="font-semibold text-blue-400 hover:text-blue-500"
        href="https://github.com/lukajaa/bay-clock-3"
        target="_blank"
      >
        Code
      </a> -->
      <span
        class="cursor-pointer font-semibold text-blue-400 hover:text-blue-500"
        @click="isChangelogOpen = true"
      >
        Code
      </span>
      /
      <span
        class="cursor-pointer font-semibold text-blue-400 hover:text-blue-500"
        @click="isToolsOpen = true"
      >
        Tools
      </span>
      /
      <a
        class="font-semibold text-blue-400 hover:text-blue-500"
        href="https://forms.gle/khAXGXiUMoAoskKQA"
        target="_blank"
        rel="noopener noreferrer"
      >
        Feedback
      </a>
      /
      <span
        class="cursor-pointer font-semibold text-blue-400 hover:text-blue-500"
        @click="isCreditsOpen = true"
      >
        Credits
      </span>
    </p>

    <UModal v-model="isCreditsOpen">
      <div class="space-y-2 p-4">
        <p class="text-2xl font-semibold">
          Credits
        </p>
        <p>Maintained by ???</p>
        <p>Created by Lucas Chang with inspiration from:</p>
        <p>
          <a
            class="text-blue-400 hover:text-blue-500"
            href="https://lukajaa.github.io/bay-clock-2/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://lukajaa.github.io/bay-clock-2/
          </a> (deprecated June 14, 2024)
        </p>
        <p>
          <a
            class="text-blue-400 hover:text-blue-500"
            href="https://lukajaa.github.io/clock/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://lukajaa.github.io/clock/
          </a> (deprecated February 2, 2023)
        </p>
        <p>
          <a
            class="text-blue-400 hover:text-blue-500"
            href="https://lukajaa.github.io/bay-clock/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://lukajaa.github.io/bay-clock/
          </a> (deprecated October 16, 2021)
        </p>
        <p>
          <a
            class="text-blue-400 hover:text-blue-500"
            href="https://baysf.github.io/clock/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://baysf.github.io/clock/
          </a> (deprecated May 15, 2021 or maybe never actually worked)
        </p>
        <p>
          <a
            class="text-blue-400 hover:text-blue-500"
            href="http://clock.bayschoolsf.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            http://clock.bayschoolsf.org/
          </a> (deprecated June 11, 2016)
        </p>
      </div>
    </UModal>
    <UModal
      v-model="isToolsOpen"
      :ui="{
        width: 'sm:max-w-4xl',
      }"
    >
      <div class="p-4">
        <p class="text-2xl font-semibold">
          Tools
        </p>
        <div class="flex flex-col md:flex-row">
          <div
            v-for="n in 3"
            :key="n"
            class="flex w-full p-2 md:w-1/3 md:flex-col"
          >
            <a
              href="https://www.nytimes.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="rounded-md ring-4 ring-gray-200 transition duration-300 ease-in-out hover:ring-blue-400">
                <NuxtImg
                  src="/baydle.png"
                  alt="Baydle Game"
                  class="w-full rounded-t-md"
                />
                <div class="px-4 pb-4">
                  <p class="mt-2 text-lg font-semibold">
                    Baydle Game
                  </p>
                  <p>
                    A Bay School themed Wordle game. Guess the teacher in ten tries or less based on their room number and subject.
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </UModal>
    <UModal
      v-model="isChangelogOpen"
      :ui="{
        width: 'sm:max-w-2xl',
      }"
    >
      <div class="space-y-2 p-4">
        <p class="text-2xl font-semibold">
          Changelog
        </p>
        <p class="mt-4 text-xl font-bold">
          New in v3.0
        </p>
        <p class="text-lg font-semibold">
          Features
        </p>
        <p>
          🔗 Reverted useful links dashboard to dropdown (sometimes simpler is
          better)
        </p>
        <p>
          🥪 Zoomable lunch menu (I don't know why this was not possible
          previously)
        </p>
        <p>✍️ Option to add custom names for tutorial and morning meeting</p>
        <p>💪 Customizable 'special flex class'</p>
        <p>🧑‍🤝‍🧑 Option to specify which day you have group advisory</p>
        <p>🖌️ New color palette (36 more colors)</p>
        <p>🔵 Added option for unrounded progress bars and buttons</p>
        <p>🌙 Automatic dark mode</p>
        <p>🔔 Notifications for saving, cancelling, and resetting customizations</p>
        <p>📐 Option to add custom useful links</p>
        <p>🔍 Easier to find in search results</p>
        <p>📱 Better mobile formatting</p>
        <p class="text-lg font-semibold">
          Code Upgrades
        </p>
        <p>📦 Upgraded all packages to latest versions</p>
        <p>
          ⚡ Switched to Nuxt for maximum performance and developer experience
        </p>
        <p>🎨 Switched to TailwindCSS + NuxtUI for more customizability</p>
        <p>🦾 Added VueUse and Pinia for more functionality</p>
      </div>
    </UModal>
  </div>
</template>

<script setup lang="ts">
const isCreditsOpen = ref(false);
const isToolsOpen = ref(false);
const isChangelogOpen = ref(false);
</script>
