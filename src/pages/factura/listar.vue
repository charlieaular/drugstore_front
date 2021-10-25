<template>
  <section>
    <div class="container flex justify-center mx-auto">
      <div class="flex flex-col">
        <div class="flex-col my-4">
          <span>Facturas</span>
          <router-link
            :to="{ name: 'factura.crear' }"
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
                    Fecha compra
                  </th>
                  <th class="px-6 py-2 text-xs text-gray-500">
                    Pago total
                  </th>
                  <th class="px-6 py-2 text-xs text-gray-500">
                    Promoción
                  </th>
                  <th class="px-6 py-2 text-xs text-gray-500">
                    Medicamentos
                  </th>
                </tr>
              </thead>
              <tbody
                v-for="factura in facturas"
                :key="factura.id"
                class="bg-white text-center"
              >
                <tr class="whitespace-nowrap">
                  <td class="px-6 py-4 text-sm text-gray-500">
                    {{ factura.id }}
                  </td>
                  <td class="px-6 py-4">
                    <div class="text-sm text-gray-900">
                      {{ formatDate(factura.fecha_crear) }}
                    </div>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500">
                    $ {{ factura.pago_total }}
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500">
                    {{
                      (factura.promocion && factura.promocion.porcentaje) || 0
                    }}
                    %
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500">
                    <ul
                      v-if="factura.medicamentos && factura.medicamentos.length"
                    >
                      <li
                        v-for="medicamento in factura.medicamentos"
                        :key="medicamento.id"
                      >
                        {{ medicamento.nombre }}
                      </li>
                    </ul>
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
import factura from "../../services/factura/factura";
import dayjs from "dayjs";
export default {
  data() {
    return {
      facturas: [],
    };
  },
  mounted() {
    this.listar();
  },
  methods: {
    async listar() {
      try {
        const { data } = await factura.listar();
        this.facturas = data.facturas;
      } catch (error) {
        let err = error.response.data.error;
        this.$toast.error(err);
      }
    },
    formatDate(date) {
      return dayjs(date).format("DD MMM YYYY");
    },
  },
};
</script>
<style scoped>
.w-800 {
  width: 800px;
}
</style>
