<template>
  <v-row justify="center my-1">
    <div class="g-sign-in-button" @click="googleLogin">
      <div class="content-wrapper">
        <div class="logo-wrapper">
          <img src="https://developers.google.com/identity/images/g-logo.png" />
        </div>
        <span class="text-container">
          <span>Faça login com Google</span>
        </span>
      </div>
    </div>
  </v-row>
</template>

<script>
  export default {
    props: {
      googleLogin: {
        type: Function,
        required: true,
      },
    },
  };
</script>

<style lang="scss" scoped>
  .g-sign-in-button {
    margin: 10px;
    display: inline-block;
    width: 240px;
    height: 50px;
    background-color: #4285f4;
    color: #fff;
    border-radius: 1px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
    transition: background-color 0.218s, border-color 0.218s, box-shadow 0.218s;

    & img {
      width: 18px;
      height: 18px;
    }
    &:hover {
      cursor: pointer;
      -webkit-box-shadow: 0 0 3px 3px rgba(66, 133, 244, 0.3);
      box-shadow: 0 0 3px 3px rgba(66, 133, 244, 0.3);
    }
    &:active {
      background-color: #3367d6;
      transition: background-color 0.2s;
    }
    & .content-wrapper {
      height: 100%;
      width: 100%;
      border: 1px solid transparent;
    }
    & .logo-wrapper {
      padding: 15px;
      background: #fff;
      width: 48px;
      height: 100%;
      border-radius: 1px;
      display: inline-block;
    }
    & .text-container {
      font-family: Roboto, arial, sans-serif;
      font-weight: 500;
      letter-spacing: 0.21px;
      font-size: 16px;
      line-height: 48px;
      vertical-align: top;
      border: none;
      display: inline-block;
      text-align: center;
      width: 180px;
    }
  }
</style>
