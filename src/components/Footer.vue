<template>
  <div class="Footer">
    <div class="left">
      <div class="logo"><router-link to="/"><img src="../assets/img/caas_logo.svg" alt="logo"></router-link></div>
      <p>© 2021 VeriDeFi. All Rights reserved</p>
      <div class="otherIcon">
        <router-link to="https://www.facebooke.cn" target="_blank"><img src="../assets/img/facebook.svg" alt="facebook" /></router-link>
        <router-link to="/" target="_blank"><img src="../assets/img/youtube.svg" alt="youtube" /></router-link>
        <router-link to="/" target="_blank"><img src="../assets/img/in.svg" alt="in" /></router-link>
        <router-link to="/" target="_blank"><img src="../assets/img/g+.svg" alt="g+" /></router-link>
        <router-link to="/" target="_blank"><img src="../assets/img/skype.svg" alt="skype" /></router-link>
      </div>
    </div>
    <div class="right">
      <div class="oList">
        <h3>Company</h3>
        <router-link to="">What We Provide</router-link>
        <h3 :style="{'margin-top': '32px'}">About Us</h3>
        <router-link to="">News</router-link>
        <router-link to="">Announcement</router-link>
        <router-link to="">Contact Us</router-link>
      </div>
      <div class="oList">
        <h3>Solutions</h3>
        <router-link to="">KYC Onboarding</router-link>
        <router-link to="">Profile Management</router-link>
        <router-link to="">Wallet Address Verification</router-link>
        <router-link to="">Real Time Monitoring</router-link>
        <router-link to="">API Service Integration</router-link>
      </div>
      <div class="oList">
        <h3>Legel</h3>
        <router-link to="">Privacy Policy</router-link>
        <router-link to="">Terms & Conditions</router-link>
        <router-link to="">Cookie Notice</router-link>
        <router-link to="">Real Time Monitoring</router-link>
        <router-link to="">API Service Integration</router-link>
      </div>
      <div class="oList">
        <h3>Resource</h3>
        <router-link to="">FAQ</router-link>
        <router-link to="">API Documentation</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import '../assets/css/footer.scss'

  export default {
    name: 'Footer',
    data() {
      return {

      }
    }
  }
</script>