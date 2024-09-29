<template>
  
</template>

<script>
export default {
  setup(props, { emit }) {
    const onClick = (e) => {
      emit('onClick', e)
    }
    return {
      props,
      onClick
    }
  }
}
</script>
