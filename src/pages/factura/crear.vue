<template>
  <section>
    <p
      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
    >
      Crear una nueva factura
    </p>
    <Form
      class="w-full max-w-lg"
      @submit="onSubmit()"
      :validation-schema="schema"
    >
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
          <Field
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="pago_total"
            name="pago_total"
            v-model="model.pago_total"
            type="number"
          />
          <ErrorMessage class="text-red-500 text-xs italic" name="pago_total" />
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
        type="submit"
      >
        Guardar
      </button>
      <router-link
        :to="{ name: 'factura.listar' }"
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded           focus:outline-none focus:shadow-outline float-right"
      >
        Cancelar
      </router-link>
    </Form>
  </section>
</template>

<style src="@vueform/multiselect/themes/default.css"></style>
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import LitepieDatepicker from "litepie-datepicker";
import factura from "../../services/factura/factura";
import promocion from "../../services/promocion/promocion";
import medicamento from "../../services/medicamento/medicamento";
import dayjs from "dayjs";
import Multiselect from "@vueform/multiselect";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
    LitepieDatepicker,
    Multiselect,
  },
  data() {
    const schema = yup.object({
      pago_total: yup.number().required(),
    });

    const model = {
      fecha: dayjs().format("DD MMM YYYY"),
      pago_total: 0,
      promocion: null,
      medicamentos: [],
    };
    return {
      schema,
      model,
      medicamentos: [],
      promociones: [],
      formatter: {
        date: "DD MMM YYYY",
        month: "MMM",
      },
    };
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
        if (!this.model.fecha) {
          return this.$toast.error("La fecha es requerida");
        }
        this.model.fecha = dayjs(this.model.fecha).format("YYYY-MM-DD");
        this.model.pago_total = parseFloat(this.model.pago_total);
        console.log(this.model);
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
