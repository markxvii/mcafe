<template>
    <div class="page">
        <Form :model="formItem" style="width:60%;margin:30px auto;" :rules="formRule" ref="formItem">
            <FormItem label="Name" prop="name">
                <Input v-model="formItem.name" placeholder="咖啡店名"></Input>
            </FormItem>
            <FormItem label="Address" prop="address">
                <Input v-model="formItem.address" placeholder="地址"></Input>
            </FormItem>
            <FormItem label="City" prop="city">
                <Input v-model="formItem.city" placeholder="城市"></Input>
            </FormItem>
            <FormItem label="State" prop="state">
                <Input v-model="formItem.state" placeholder="省份"></Input>
            </FormItem>
            <FormItem label="Zip" prop="zip">
                <Input v-model="formItem.zip" placeholder="邮编"></Input>
            </FormItem>
            <FormItem label="Website" prop="website">
                <Input v-model="formItem.website" placeholder="网址"></Input>
            </FormItem>
            <FormItem label="Description" prop="description">
                <Input v-model="formItem.description" placeholder="商店描述"></Input>
            </FormItem>
            <FormItem label="烘焙方式" prop="brewMethods">
                <CheckboxGroup v-model="formItem.brewMethods">
                    <Checkbox v-for="(item,index) of brewMethodss" :key="index" :label="item.id">{{item.method}}
                    </Checkbox>
                </CheckboxGroup>
            </FormItem>
            <div>
                <input-tag v-model="tags"></input-tag>
            </div>
            <FormItem>
                <Button style="margin-top:20px" type="primary" @click="submitNewCafe('formItem')">提交</Button>
            </FormItem>
        </Form>
    </div>
</template>

<script>
    import {EventBus} from '../event-bus.js';
    import InputTag from 'vue-input-tag'

    export default {
        name: "NewCafe",
        components: {
            InputTag
        },
        computed: {
            brewMethodss() {
                return this.$store.getters.getBrewMethods;
            }
        },
        data() {
            const validateZip = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请确保此项不为空!'));
                } else if (!value.match(/(^\d{6}$)/)) {
                    callback(new Error('请输入正确的6位数邮编！'))
                } else {
                    callback();
                }
            };
            const validateWebsite = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请确保此项不为空!'));
                } else if (!value.match(/[a-zA-z]+:\/\/[^\s]*/)) {
                    callback(new Error('请输入正确的url！'))
                } else {
                    callback();
                }
            };
            return {
                formItem: {
                    name: '',
                    address: '',
                    // locations:[],//新增
                    website: '',//新增
                    description: '',//新增
                    roaster: false,//新增
                    brewMethods: [],
                    city: '',
                    state: '',
                    zip: ''
                },
                tags: [],
                formRule: {
                    name: [
                        {required: true, message: '请确保此项不为空！', trigger: 'blur'}
                    ],
                    address: [
                        {required: true, message: '请确保此项不为空！', trigger: 'blur'}
                    ],
                    city: [
                        {required: true, message: '请确保此项不为空！', trigger: 'blur'}
                    ],
                    state: [
                        {required: true, message: '请确保此项不为空！', trigger: 'blur'}
                    ],
                    zip: [
                        {validator: validateZip, trigger: 'blur'}
                    ],
                    website: [
                        {validator: validateWebsite, trigger: 'blur'}
                    ],
                }
            }
        },
        methods: {
            submitNewCafe(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$store.dispatch('addCafe', {
                            name: this.formItem.name,
                            address: this.formItem.address,
                            city: this.formItem.city,
                            state: this.formItem.state,
                            zip: this.formItem.zip,
                            website: this.formItem.website,
                            description: this.formItem.description,
                            roaster: this.formItem.roaster,
                            brewMethods: this.formItem.brewMethods,
                            tags:this.tags,
                        })
                        this.$Message.success('提交成功！');
                    } else {
                        this.$Message.error('请正确填写表单！')
                    }
                })

            }
        },
        mounted() {
            EventBus.$on('tags-edited', function (tagsAdded) {
                for (let i in tagsAdded) {
                    this.tags.push(tagsAdded[i]);
                    this.tags.map((i) => {
                        console.log(i)
                    })
                }
            }.bind(this));
        },
    }
</script>

<style scoped>

</style>
