<template>
  <section>
    <div class="container flex justify-center mx-auto">
      <div class="flex flex-col">
        <div class="flex-col my-4">
          <span>Promociones</span>
          <router-link
            :to="{ name: 'promocion.crear' }"
            class="float-right bg-indigo-500 h-8 w-8 text-white text-center font-extrabold flex items-center justify-center rounded-full cursor-pointer"
            >+</router-link
          >
        </div>
        <div class="w-full flex-col">
          <div class="border-b border-gray-200 shadow">
            <table class="w-800">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-2 text-xs text-gray-500">
                    ID
                  </th>
                  <th class="px-6 py-2 text-xs text-gray-500">
                    Descripción
                  </th>
                  <th class="px-6 py-2 text-xs text-gray-500">
                    Porcentaje
                  </th>
                  <th class="px-6 py-2 text-xs text-gray-500">
                    Fecha inicio
                  </th>
                  <th class="px-6 py-2 text-xs text-gray-500">
                    Fecha fin
                  </th>
                </tr>
              </thead>
              <tbody
                v-for="promocion in promociones"
                :key="promocion.id"
                class="bg-white text-center"
              >
                <tr class="whitespace-nowrap">
                  <td class="px-6 py-4 text-sm text-gray-500">
                    {{ promocion.id }}
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm text-gray-900">
                      {{ promocion.descripcion }}
                    </div>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500">
                    {{ promocion.porcentaje }} %
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500">
                    {{ formatearfecha(promocion.fecha_inicio) }}
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500">
                    {{ formatearfecha(promocion.fecha_fin) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import promocion from "../../services/promocion/promocion";
import dayjs from "dayjs";
export default {
  data() {
    return {
      promociones: [],
    };
  },
  mounted() {
    this.listar();
  },
  methods: {
    formatearfecha(date) {
      return dayjs(date).format("DD MMM YYYY");
    },
    async listar() {
      try {
        const { data } = await promocion.listar();
        this.promociones = data.promociones;
      } catch (error) {
        let err = error.response.data.error;
        this.$toast.error(err);
      }
    },
  },
};
</script>
<style scoped>
.w-800 {
  width: 800px;
}
</style>
