<template>
  <v-chart class="chart" :option="option" />
</template>

<script>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { BarChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, defineComponent } from "vue";

use([
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);

export default defineComponent({
  name: "BarCHart",
  components: {
    VChart,
  },
  props: {
    options: {
      type: Object,
      required: true,
    },
  },
  provide: {
    [THEME_KEY]: "light",
  },
  setup(props) {
    const option = ref(props.options);

    return { option };
  },
});
</script>

<style scoped>
.chart {
  height: 400px;
  width: 800px;
}
</style>
