<template>
    <div class="main">
        <h2>{{ channelName }}</h2>
        <!-- show single messages -->
        <single-message :messages="messages"></single-message>
        <!-- message form -->
        <message-form></message-form>
    </div>
</template>

<script>
import SingleMessage from './SingleMessage'
import MessageForm from './MessageForm'
import database from 'firebase/database'
import {mapGetters} from 'vuex'
    export default {
        name: 'messages',
        components: {SingleMessage, MessageForm},
        data() {
            return {
                messagesRef: firebase.database().ref('messages'),
                privateMessagesRef: firebase.database().ref('privateMessages'),
                messages: [],
                channel: null,
                listeners: []
            }
        },
        
        computed: {
            ...mapGetters(['currentChannel', 'currentUser', 'isPrivate']),
            
            //to display channel name
            channelName() {
                if(this.channel !== null) {
                    return this.isPrivate ? '@ ' + this.channel.name : '# ' + this.channel.name
                }
            }
        },
        
        watch: {
            currentChannel: function() {
                // if current channel changes, watch for its messages, i.e. show messages of the selected channel
                
                this.detachListeners()
                this.addListeners()
                this.channel = this.currentChannel
            }
        },
        
        methods: {
            addListeners() {
                let ref = this.getMessagesRef()
                
                // listen to child added events on current channel
                ref.child(this.currentChannel.id).on('child_added', (snapshot) => {
                    let message = snapshot.val()
                    message['id'] = snapshot.key  //Each message will have a unique id
                    
                    this.messages.push(message)
                    
                    // scroll to the top after new messages are pushed
                    this.$nextTick(() => {
                        $("html, body").scrollTop($(document).height());
                      })
                })
                
                // pass arguments to addToListeners() method
                this.addToListeners(this.currentChannel.id, ref, 'child_added')
            },
            
            addToListeners(id, ref, event) {
                let index = this.listeners.findIndex(el => {
                    return el.id === id && el.ref === ref && el.event === event
                })
                if(index === -1) {
                    this.listeners.push({id:id, ref:ref, event:event})
                }
            },
            
            detachListeners() {
                this.listeners.forEach(listener => {
                    listener.ref.child(listener.id).off(listener.event)
                })
                this.listeners = []
                this.messages = []
            },
            
            //to determine whether the messages are private or not
            getMessagesRef() {
                if(this.isPrivate) {
                    return this.privateMessagesRef
                } else {
                    return this.messagesRef
                }
            }
        },
        beforeDestroy() {
            this.detachListeners()
        }
    }
</script>

<style scoped>
   .main h2 {
    margin: 0.5em 0 1em 0;
	font-weight: 600;
	font-family: 'Titillium Web', sans-serif;
	position: relative;
	text-shadow: 0 -1px 1px rgba(0,0,0,0.4);
	font-size: 32px;
	line-height: 40px;
	color: #f80909;
	text-transform: uppercase;
	border-bottom: 1px solid greenyellow;
   }

</style>
