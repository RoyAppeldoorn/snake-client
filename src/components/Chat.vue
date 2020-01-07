<template>
  <v-navigation-drawer app class="dark-bg">
    <div id="main-content" class="container">
      <div class="row">
        <div class="col-md-12">
          <table id="conversation" class="table table-striped">
            <thead>
              <tr>
                <th>Greetings</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in messages" :key="item">
                <td>{{ item.message }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="social">
      <div class="panel-top">
        <div class="panel-header panel-header--global_chat">
          <div class="title">Global chat</div>
        </div>
        <div class="panel-content">
          <div class="match-count-info">
            Play 5 more matches<br />to join this channel!
          </div>
        </div>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: ["messages"]
};
</script>

<style lang="scss" scoped>
.dark-bg {
  background-color: #0b0f1b !important;
}

.panel-top {
  font-family: Asap, Arial;
  font-size: 18px;
  font-weight: 400;
  color: #fff;
  letter-spacing: 1px;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  user-select: none;
  pointer-events: all;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 382px;
  vertical-align: top;
  line-height: 27px;
}

.panel-header .panel-header--global_chat {
  font-family: Asap, Arial;
  font-size: 18px;
  font-weight: 400;
  color: #fff;
  letter-spacing: 1px;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  user-select: none;
  pointer-events: all;
  line-height: 27px;
  box-sizing: border-box;
  position: relative;
  border-bottom: 4px solid transparent;
  border-bottom-color: #0eb1be;
}

.panel-content {
  font-family: Asap, Arial;
  font-size: 18px;
  font-weight: 400;
  color: #fff;
  letter-spacing: 1px;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  user-select: none;
  pointer-events: all;
  line-height: 27px;
  box-sizing: border-box;
  background: hsla(0, 0%, 100%, 0.07);
  border-radius: 5px;
  flex-grow: 1;
  max-height: 100%;
  height: 100%;
  overflow: hidden;
}

.panel-input .panel-input--disabled {
  font-weight: 400;
  color: #fff;
  letter-spacing: 1px;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  user-select: none;
  pointer-events: all;
  box-sizing: border-box;
  width: 100%;
  border-radius: 5px;
  position: absolute;
  bottom: 0;
  height: 40px;
  font-size: 16px;
  font-family: AsapBold, Arial;
  line-height: 40px;
  vertical-align: middle;
  cursor: not-allowed;
  background: #787878;
}

.social {
  font-family: Asap, Arial;
  font-size: 18px;
  font-weight: 400;
  color: #fff;
  letter-spacing: 1px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  user-select: none;
  box-sizing: border-box;
  width: 290px;
  height: 425px;
  position: fixed;
  left: 10px;
  bottom: 10px;
  display: flex;
  pointer-events: all;
}
</style>
