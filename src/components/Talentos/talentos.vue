<template>
  <section class="talent-showcase" :class="{ inline }" id="talentos">
    <InversionistaModal ref="inversionistaModal" />

    <TalentosHeader v-if="showHeader" />

    <TalentosFilters
      :filters="filters"
      v-model="activeFilter"
    />

    <div class="talent-grid">
      <TalentoCard
        v-for="talent in filteredTalents"
        :key="talent.id"
        :talent="talent"
        @invertir="openInversionista(talent)"
      />
    </div>

    <slot name="cta">
      <TalentosCTA v-if="showCTA" />
    </slot>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import InversionistaModal from '../Modales/InversionistaModal.vue'
import { filters, talents } from './talentosData'
import type { Talent } from './talentosData'
import TalentosHeader from './TalentosHeader.vue'
import TalentosFilters from './TalentosFilters.vue'
import TalentoCard from './TalentoCard.vue'
import TalentosCTA from './TalentosCTA.vue'

const props = withDefaults(defineProps<{
  showHeader?: boolean
  showCTA?: boolean
  inline?: boolean
}>(), {
  showHeader: true,
  showCTA: true,
  inline: false
})

const route = useRoute()
const router = useRouter()

const inversionistaModal = ref<InstanceType<typeof InversionistaModal> | null>(null)

const activeFilter = ref((route.query.filter as string) || 'Todos')

watch(() => route.query.filter, (newFilter) => {
  activeFilter.value = (newFilter as string) || 'Todos'
})

watch(activeFilter, (newFilter) => {
  if (newFilter === 'Todos') {
    router.replace({ query: { ...route.query, filter: undefined } })
  } else {
    router.replace({ query: { ...route.query, filter: newFilter } })
  }
})

const filteredTalents = computed(() => {
  if (activeFilter.value === 'Todos') {
    return talents
  }
  const filter = activeFilter.value.trim()
  return talents.filter(t => t.sport.trim() === filter)
})

const openInversionista = (talent: Talent) => {
  inversionistaModal.value?.open(talent.slug)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');

.talent-showcase {
  padding: 80px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.talent-showcase.inline {
  padding: 0;
  max-width: none;
  position: relative;
  z-index: 2;
}

.talent-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 60px;
}

@media (max-width: 1024px) {
  .talent-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .talent-showcase {
    padding: 60px 16px;
  }
  .talent-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 40px;
  }
}

@media (max-width: 576px) {
  .talent-showcase {
    padding: 40px 12px;
  }
  .talent-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
</style>
