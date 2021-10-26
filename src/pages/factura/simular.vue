<template>
  <section class="w-screen">
    <p
      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
    >
      Simular factura
    </p>

    <div class="flex flex-wrap lg:-mx-4 xl:-mx-5">
      <div class="w-full lg:my-4 lg:px-4 lg:w-1/3 xl:my-5 xl:px-5 xl:w-1/3">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="fecha"
            >
              Fecha
            </label>
            <LitepieDatepicker
              as-single
              v-model="model.fecha"
              :formatter="formatter"
            >
            </LitepieDatepicker>
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full md:w-2/3 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="medicamentos"
            >
              Medicamentos
            </label>
            <div class="relative">
              <Multiselect
                v-model="model.medicamentos"
                :options="medicamentos"
                valueProp="id"
                mode="tags"
                searchable
                label="nombre"
                trackBy="nombre"
              >
                <template v-slot:tag="{ option, handleTagRemove, disabled }">
                  <div class="multiselect-tag2 is-user">
                    {{ option.nombre }}
                    <i
                      v-if="!disabled"
                      @click.prevent
                      @mousedown.prevent.stop="handleTagRemove(option, $event)"
                    />
                  </div>
                </template>
              </Multiselect>
            </div>
          </div>
        </div>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          @click="simular()"
        >
          Simular
        </button>
      </div>

      <div
        v-if="facturaSimulacion && facturaSimulacion.pago_total"
        class="w-full lg:my-4 lg:px-4 lg:w-1/3 xl:my-5 xl:px-5 xl:w-1/3"
      >
        <div class="block tracking-wide text-gray-700 text-xs mb-2">
          El posible valor es
          {{ (facturaSimulacion && facturaSimulacion.pago_total) || 0 }}
        </div>
        <!-- Column Content -->
      </div>
    </div>
  </section>
</template>

<style src="@vueform/multiselect/themes/default.css"></style>
<script>
import dayjs from "dayjs";
import Multiselect from "@vueform/multiselect";
import medicamento from "../../services/medicamento/medicamento";
import LitepieDatepicker from "litepie-datepicker";
import factura from "../../services/factura/factura";

export default {
  components: {
    LitepieDatepicker,
    Multiselect,
  },
  data() {
    const model = {
      fecha: dayjs().format("DD MMM YYYY"),
      medicamentos: [],
    };
    return {
      model,
      medicamentos: [],
      fecha: "",
      formatter: {
        date: "DD MMM YYYY",
        month: "MMM",
      },
      facturaSimulacion: {},
    };
  },
  async mounted() {
    await this.listarMedicamentos();
  },
  methods: {
    async listarMedicamentos() {
      try {
        const { data } = await medicamento.listar();
        this.medicamentos = data.medicamentos;
      } catch (error) {
        let err = error.response.data.error;
        this.$toast.error(err);
      }
    },
    async simular() {
      try {
        if (!this.model.fecha)
          return this.$toast.error("La fecha es requerida");
        if (!this.model.medicamentos.length)
          return this.$toast.error("Debe haber al menos un medicamento");
        this.model.fecha = dayjs(this.model.fecha).format("YYYY-MM-DD");
        const { data } = await factura.simular(this.model);
        if (data.exito) {
          this.facturaSimulacion = data.factura;
        }
      } catch (error) {
        let err = error.response.data.error;
        this.$toast.error(err);
      }
    },
  },
};
</script>

<style scoped>
.multiselect-tag2 {
  background: #10b981;
  color: #fff;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 600;
  border-radius: 4px;
  margin-right: 0.25rem;
  margin-bottom: 0.25rem;
  display: flex;
  align-items: center;
  white-space: nowrap;
  padding: 8px;
}
</style>
