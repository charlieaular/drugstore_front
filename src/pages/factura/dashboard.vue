<template>
  <section>
    <div class="grid">
      <div class="grid-cols-3">
        <h1>Dashboard</h1>
        <label
          class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          for="fecha"
        >
          Fecha
        </label>

        <litepie-datepicker
          v-model="fechas"
          separator=" a "
          :formatter="formatter"
        ></litepie-datepicker>

        <button
          type="button"
          class="mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline float-right cursor-pointer"
          @click="buscar()"
        >
          Buscar
        </button>
      </div>
    </div>
    <div class="grid">
      <chart :options="option" />
    </div>
  </section>
</template>

<script>
import chart from "./components/chart.vue";
import dayjs from "dayjs";
import LitepieDatepicker from "litepie-datepicker";
import factura from "../../services/factura/factura";
export default {
  components: {
    chart,
    LitepieDatepicker,
  },
  data() {
    return {
      fechas: [dayjs().subtract(1, "week"), dayjs()],
      formatter: {
        date: "DD MMM YYYY",
        month: "MMM",
      },
      option: {
        xAxis: {
          data: [],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            type: "bar",
            data: [],
          },
        ],
      },
    };
  },
  mounted() {
    this.buscar();
  },
  methods: {
    async buscar() {
      try {
        if (!this.fechas.length)
          return this.$toast.error("Debe seleccionar las fechas");
        let params = {
          fecha_inicio: dayjs(this.fechas[0]).format("YYYY-MM-DD"),
          fecha_fin: dayjs(this.fechas[1]).format("YYYY-MM-DD"),
        };

        const { data } = await factura.grafica(params);
        let fechas = data.facturas.map((el) =>
          dayjs(el.fecha_crear).format("DD MMM YYYY")
        );
        let pagos = data.facturas.map((el) => el.pago_total);
        this.option.xAxis.data = fechas;
        this.option.series[0].data = pagos;
      } catch (error) {
        console.log({ error });
        let err = error.response.data.error;
        this.$toast.error(err);
      }
    },
  },
};
</script>

<style></style>
