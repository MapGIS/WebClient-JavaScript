<template>
  <div>
    <template v-for="item in configList.childs">
      <card-group
        v-if="item.leaffolder == true"
        :key="item.name"
        :folder="item.folder"
        :type="configList.mapmode"
        :firstkind="item.folder"
        :firstname="item.name"
        :secondname=undefined
        :title="item.name"
        :card-list="item.childs"
      ></card-group>
      <card-group
        v-else
        v-for="child in item.childs"
        :key="child.name"
        :folder="child.folder"
        :type="configList.mapmode"
        :firstkind="item.folder"
        :secondkind="child.folder"
        :firstname="item.name"
        :secondname="item.name"
        :title="child.name"
        :card-list="child.childs"
      ></card-group>
    </template>
  </div>
</template>

<script>
import CardGroup from "@/components/CardGroup";

export default {
  name: "gallery",
  components: {
    CardGroup
  },
  props: {
    configList: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
</style>