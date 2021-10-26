<template>
  <section>
    <p
      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
    >
      Crear nueva promoción
    </p>
    <Form
      class="w-full max-w-lg"
      @submit="onSubmit()"
      :validation-schema="schema"
    >
      <div class="flex flex-wrap -mx-3 mb-6 w-full">
        <div class="w-full md:w-1/1 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="fecha"
          >
            Fecha
          </label>
          <litepie-datepicker
            v-model="model.fecha"
            separator=" a "
            :formatter="formatter"
          ></litepie-datepicker>
        </div>
        <div class="w-full md:w-2/6 px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="porcentaje"
          >
            Porcentaje
          </label>
          <Field
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="porcentaje"
            name="porcentaje"
            v-model="model.porcentaje"
            type="number"
          />
          <ErrorMessage class="text-red-500 text-xs italic" name="porcentaje" />
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="descripcion"
          >
            Descripción
          </label>

          <Field
            id="descripcion"
            name="descripcion"
            type="textarea"
            v-slot="{ field }"
          >
            <textarea
              name=""
              id=""
              cols="49"
              rows="3"
              class="resize border rounded-md"
              v-bind="field"
              v-model="model.descripcion"
            >
            </textarea>
          </Field>
          <ErrorMessage
            class="text-red-500 text-xs italic"
            name="descripcion"
          />
        </div>
      </div>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Guardar
      </button>
      <router-link
        :to="{ name: 'promocion.listar' }"
        class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded           focus:outline-none focus:shadow-outline float-right"
      >
        Cancelar
      </router-link>
    </Form>
  </section>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import promocion from "../../services/promocion/promocion";
import LitepieDatepicker from "litepie-datepicker";
import dayjs from "dayjs";
export default {
  components: {
    Form,
    Field,
    ErrorMessage,
    LitepieDatepicker,
  },
  data() {
    const schema = yup.object({
      porcentaje: yup
        .number()
        .required()
        .min(1)
        .max(70),
      descripcion: yup
        .string()
        .required()
        .max(100),
    });

    const model = {
      fecha: [dayjs(), dayjs().add(1, "day")],
      porcentaje: 0,
      descripcion: "",
    };
    return {
      schema,
      model,
      formatter: {
        date: "DD MMM YYYY",
        month: "MMM",
      },
    };
  },
  methods: {
    async onSubmit() {
      try {
        let { porcentaje, descripcion } = this.model;
        let fechaInicio = dayjs(this.model.fecha[0]).format("YYYY-MM-DD");
        let fechaFin = dayjs(this.model.fecha[1]).format("YYYY-MM-DD");
        let obj = {
          porcentaje: parseFloat(porcentaje),
          descripcion,
          fecha_inicio: fechaInicio,
          fecha_fin: fechaFin,
        };

        const { data } = await promocion.crear(obj);
        if (data.exito) {
          this.$router.replace({ name: "promocion.listar" });
        }
      } catch (error) {
        let err = error.response.data.error;
        this.$toast.error(err);
      }
    },
  },
};
</script>

<style></style>
