<template>
  <section>
    <p
      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
    >
      Crear una nueva factura
    </p>

    <div class="w-full max-w-lg">
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="nombre"
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
        <div class="w-full md:w-1/2 px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="pago_total"
          >
            Pago total
          </label>
          {{ pagoTotal }}
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="promocion"
          >
            Promoción
          </label>
          <div class="relative">
            <select
              class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="promocion"
              v-model="model.promocion"
            >
              <option
                v-for="promocion in promociones"
                :key="promocion.id"
                :value="promocion.id"
              >
                {{ promocion.porcentaje }} %
              </option>
            </select>
            <div
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
            >
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div class="w-full md:w-2/3 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="medicamentos"
          >
            Medicamentos
          </label>
          <div class="relative">
            <!-- <Multiselect
              v-model="value"
              mode="multiple"
              :options="[
                { value: 'batman', label: 'Batman' },
                { value: 'robin', label: 'Robin', disabled: true },
                { value: 'joker', label: 'Joker' },
              ]"
            /> -->
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
            <!-- <select
              class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="medicamentos"
              v-model="model.medicamentos"
              multiple
            >
              <option
                v-for="medicamento in medicamentos"
                :key="medicamento.id"
                :value="medicamento.id"
              >
                {{ medicamento.nombre }}
              </option>
            </select> -->
          </div>
        </div>
      </div>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        @click="onSubmit()"
      >
        Guardar
      </button>
      <router-link
        :to="{ name: 'factura.listar' }"
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded           focus:outline-none focus:shadow-outline float-right"
      >
        Cancelar
      </router-link>
    </div>
  </section>
</template>

<style src="@vueform/multiselect/themes/default.css"></style>
<script>
import LitepieDatepicker from "litepie-datepicker";
import factura from "../../services/factura/factura";
import promocion from "../../services/promocion/promocion";
import medicamento from "../../services/medicamento/medicamento";
import dayjs from "dayjs";
import Multiselect from "@vueform/multiselect";

export default {
  components: {
    LitepieDatepicker,
    Multiselect,
  },
  data() {
    const model = {
      fecha: dayjs().format("DD MMM YYYY"),
      promocion: null,
      medicamentos: [],
    };
    return {
      model,
      medicamentos: [],
      promociones: [],
      formatter: {
        date: "DD MMM YYYY",
        month: "MMM",
      },
    };
  },
  computed: {
    pagoTotal() {
      return this.model.medicamentos.reduce((acc, el) => {
        let { precio = 0 } =
          this.medicamentos.find((ele) => ele.id == el) ?? {};
        return acc + Number(precio);
      }, 0);
    },
  },
  async mounted() {
    await this.listarPromociones();
    await this.listarMedicamentos();
  },
  methods: {
    async listarPromociones() {
      try {
        const { data } = await promocion.listar();
        this.promociones = data.promociones;
      } catch (error) {
        let err = error.response.data.error;
        this.$toast.error(err);
      }
    },
    async listarMedicamentos() {
      try {
        const { data } = await medicamento.listar();
        this.medicamentos = data.medicamentos;
      } catch (error) {
        let err = error.response.data.error;
        this.$toast.error(err);
      }
    },
    async onSubmit() {
      try {
        if (!this.model.fecha)
          return this.$toast.error("La fecha es requerida");
        if (!this.model.medicamentos.length)
          return this.$toast.error("Debe haber al menos un medicamento");
        this.model.fecha = dayjs(this.model.fecha).format("YYYY-MM-DD");
        this.model.pago_total = parseFloat(this.pagoTotal);

        if (this.model.promocion) {
          let { porcentaje } = this.promociones.find(
            (el) => el.id == this.model.promocion
          );
          let restar = (Number(porcentaje) * this.pagoTotal) / 100;
          this.model.pago_total -= restar;
        }
        const { data } = await factura.crear(this.model);
        if (data.exito) {
          this.$router.replace({ name: "factura.listar" });
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
