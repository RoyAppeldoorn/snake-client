<template>
  <v-container>
    <v-row v-if="error">
      <v-col xs="12" sm="10" md="8" lg="6">
        <app-alert @dismissed="onDismissed">
          {{ error }}
        </app-alert>
      </v-col>
    </v-row>
    <v-row>
      <v-col xs="12" sm="10" md="8" lg="6" align-self="start">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            color="#88CD97"
            single-line
            outlined
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            color="#88CD97"
            single-line
            outlined
            v-model="password"
            :rules="passwordRules"
            label="Password"
            required
            :append-icon="
              passwordShow ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
            "
            :type="passwordShow ? 'text' : 'password'"
            @click:append="passwordShow = !passwordShow"
            loading
          >
            <template v-slot:progress>
              <v-progress-linear
                v-if="custom"
                :value="progress"
                :color="color"
                height="7"
                absolute
              ></v-progress-linear>
            </template>
          </v-text-field>

          <v-text-field
            color="#88CD97"
            single-line
            outlined
            v-model="confirmPassword"
            label="Confirm Password"
            :rules="[confirmPasswordRules, passwordConfirmationRule]"
            required
            :append-icon="
              confirmPasswordShow ? 'mdi-eye-off-outline' : 'mdi-eye-outline'
            "
            :type="confirmPasswordShow ? 'text' : 'password'"
            @click:append="confirmPasswordShow = !confirmPasswordShow"
          ></v-text-field>

          <v-row
            class="pa-0 ma-0"
            justify="space-between"
            align-content="center"
          >
            <v-btn
              :disabled="!valid"
              outlined
              color="#88CD97"
              @click="validate"
              :loading="loading"
            >
              Register
            </v-btn>
            <span style="align-self: center">
              OR
            </span>

            <router-link to="/signin" style="color: #ffffff">
              <v-btn text color="#">Login</v-btn></router-link
            >
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { authComputed } from "@/store/helpers.js";

export default {
  data: () => ({
    passwordShow: false,
    confirmPasswordShow: false,
    valid: true,
    custom: true,
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    password: "",
    confirmPassword: "",
    passwordRules: [
      v => !!v || "Password Required",
      v => v.length >= 6 || "Minimum Of 6 Charachters Is Required"
    ],
    confirmPasswordRules: [v => !!v || "Confirmation Password Required"]
  }),
  computed: {
    passwordConfirmationRule() {
      return this.password === this.confirmPassword || "Password must match";
    },
    error() {
      return this.$store.getters.error;
    },
    loading() {
      return this.$store.getters.loading;
    },
    progress() {
      return Math.min(100, this.password.length * 7);
    },
    color() {
      return ["error", "warning", "success"][Math.floor(this.progress / 40)];
    },
    ...authComputed
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.registerWithFirebase();
      }
    },
    registerWithFirebase() {
      const user = {
        email: this.email,
        password: this.password
      };
      this.$store.dispatch("signUp", user);
    },
    onDismissed() {
      this.$store.dispatch("clearError", null);
    }
  }
};
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
</style>
