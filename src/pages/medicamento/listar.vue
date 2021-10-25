<template>
  <section>
    <div class="container flex justify-center mx-auto">
      <div class="flex flex-col">
        <div class="flex-col my-4">
          <span>Medicamentos</span>
          <router-link
            :to="{ name: 'medicamento.crear' }"
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
                    Medicamento
                  </th>
                  <th class="px-6 py-2 text-xs text-gray-500">
                    Precio
                  </th>
                  <th class="px-6 py-2 text-xs text-gray-500">
                    Ubicación
                  </th>
                </tr>
              </thead>
              <tbody
                v-for="medicamento in medicamentos"
                :key="medicamento.id"
                class="bg-white text-center"
              >
                <tr class="whitespace-nowrap">
                  <td class="px-6 py-4 text-sm text-gray-500">
                    {{ medicamento.id }}
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm text-gray-900">
                      {{ medicamento.nombre }}
                    </div>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500">
                    $ {{ medicamento.precio }}
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500">
                    {{ medicamento.ubicacion }}
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
import medicamento from "../../services/medicamento/medicamento";
export default {
  data() {
    return {
      medicamentos: [],
    };
  },
  mounted() {
    this.listar();
  },
  methods: {
    async listar() {
      try {
        const { data } = await medicamento.listar();
        this.medicamentos = data.medicamentos;
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
