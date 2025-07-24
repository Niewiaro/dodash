<script setup lang="ts">
await $fetch("/api/auth/logout", { method: "POST" });
navigateTo("/login");
</script>
