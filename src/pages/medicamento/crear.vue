<template>
  <section>
    <p
      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
    >
      Crear un nuevo medicamento
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
            Nombre
          </label>
          <Field
            class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="nombre"
            name="nombre"
            v-model="model.nombre"
            type="text"
          />
          <ErrorMessage class="text-red-500 text-xs italic" name="nombre" />
        </div>
        <div class="w-full md:w-1/2 px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="precio"
          >
            Precio
          </label>
          <Field
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="precio"
            name="precio"
            v-model="model.precio"
            type="number"
          />
          <ErrorMessage class="text-red-500 text-xs italic" name="precio" />
        </div>
      </div>
      <div class="flex flex-wrap -mx-3 mb-6">
        <div class="w-full px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="ubicacion"
          >
            Ubicación
          </label>
          <Field
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="ubicacion"
            name="ubicacion"
            v-model="model.ubicacion"
            type="text"
          />
          <ErrorMessage class="text-red-500 text-xs italic" name="ubicacion" />
        </div>
      </div>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Guardar
      </button>
      <router-link
        :to="{ name: 'medicamento.listar' }"
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
import medicamento from "../../services/medicamento/medicamento";

export default {
  data() {
    const schema = yup.object({
      nombre: yup
        .string()
        .required()
        .max(50),
      precio: yup.number().required(),
      ubicacion: yup
        .string()
        .required()
        .max(50),
    });

    const model = {
      nombre: "",
      precio: "",
      ubicacion: "",
    };
    return {
      schema,
      model,
    };
  },
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  methods: {
    async onSubmit() {
      try {
        const { data } = await medicamento.crear(this.model);
        if (data.exito) {
          this.$router.replace({ name: "medicamento.listar" });
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
