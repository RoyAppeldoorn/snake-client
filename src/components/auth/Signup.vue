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
          ></v-text-field>

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
              color="teal"
              @click="validate"
              :loading="loading"
            >
              Register
            </v-btn>
            <span style="align-self: center">
              OR
            </span>
            <v-btn text color="teal">
              Login
            </v-btn>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    passwordShow: false,
    confirmPasswordShow: false,
    valid: true,
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
    }
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
