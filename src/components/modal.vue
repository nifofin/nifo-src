<template>
   <div class="modal-mask" style="display: table">
     <div class="modal-wrapper" @click.self="$emit('close')">
       <div class="modal-container">

         <!-- what exactly *is* a modal window? : https://en.wikipedia.org/wiki/Modal_window -->
         <!-- something interesting to read: https://vuejs.org/v2/guide/components-slots.html -->

         <div class="modal-header">
           <slot name="header">
             default header
           </slot>
         </div>

         <div class="modal-body">
           <slot name="body">
             default body
           </slot>
         </div>

         <div class="modal-footer" style="height: auto; min-height: 20px;">
           <slot name="footer">
             <button class="modal-default-button" @click="$emit('close')">
               OK
             </button>
           </slot>
         </div>
       </div>
     </div>
   </div>
</template>

<script>
export default {
  name: "modal"
}
</script>

<style scoped>
@import "../assets/styles/variables.css";

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
  cursor: default;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 40vw;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: var(--text-accent);
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
  border: none;
  color: white;
  background-color: var(--text-accent);
  text-align: center;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 2px;
  user-select: none;
}

.modal-cancel-button {
  float: right;
  border: none;
  color: black;
  background-color: white;
  text-align: center;
  cursor: pointer;
  padding: 5px 10px;
  margin-left: 2px;
  margin-right: 2px;
}

.modal-delete-button {
  float: right;
  border: none;
  color: white;
  background-color: red;
  text-align: center;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 2px;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
