<template>
    <n-config-provider :theme="theme">
        <router-view></router-view>
    </n-config-provider>
</template>

<script setup>
import { darkTheme } from 'naive-ui'

const theme = ref()
</script>

<style lang="scss" scoped></style>
