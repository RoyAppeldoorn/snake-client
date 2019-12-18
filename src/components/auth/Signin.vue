<template>
  <v-container>
    <v-row v-if="error">
      <v-col xs="12" sm="6" offset-sm="3">
        <app-alert @dismissed="onDismissed">
          {{ error }}
        </app-alert>
      </v-col>
    </v-row>
    <v-row>
      <v-col xs="12" sm="6" offset-sm="3">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
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

          <v-row justify="space-around">
            <v-btn
              :disabled="!valid"
              color="primary"
              @click="validate"
              :loading="loading"
            >
              Sign in
            </v-btn>

            <v-btn color="error" @click="reset">
              Reset Form
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
    valid: true,
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    password: "",
    passwordRules: [v => !!v || "Password is Required"]
  }),
  computed: {
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
        this.$store.dispatch("clearError", null);
        this.loginWithFirebase();
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    loginWithFirebase() {
      const user = {
        email: this.email,
        password: this.password
      };
      this.$store.dispatch("signIn", user);
    },
    onDismissed() {
      this.$store.dispatch("clearError", null);
    }
  }
};
</script>
