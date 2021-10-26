<template>
  <section>
    <ul class="flex">
      <router-link
        :to="{ name: 'factura.listar' }"
        v-slot="{ href, isExactActive }"
      >
        <li class="mr-6">
          <a
            :href="href"
            :class="[
              (isExactActive && 'text-blue-800') ||
                'text-blue-500 hover:text-blue-800',
            ]"
            >Lista
          </a>
        </li>
      </router-link>
      <router-link
        :to="{ name: 'factura.dashboard' }"
        v-slot="{ href, isExactActive }"
      >
        <li class="mr-6">
          <a
            :href="href"
            :class="[
              (isExactActive && 'text-blue-800') ||
                'text-blue-500 hover:text-blue-800',
            ]"
          >
            Dashboard
          </a>
        </li>
      </router-link>
    </ul>
    <router-view></router-view>
  </section>
</template>

<script>
export default {};
</script>
<style scoped></style>
