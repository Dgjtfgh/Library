import React, { useState } from 'react';
import axios from 'axios';
import servicePath from '../config/ApiUrl';

import {
    Form,
    Input,
    Button,
    Select,
    message
} from 'antd';

const AddUser = () => {
    const [cno, setCno] = useState('');
    const [name, setName] = useState('');
    const [department, setDepartment] = useState('');
    const [selectedType, setSelectType] = useState('选择身份');
    const saveUser = () => {
        if (!cno) {
            message.error('编号不能为空');
            return false;
        } else if (!name) {
            message.error('姓名不能为空');
            return false;
        } else if (!department) {
            message.error('学院不能为空');
            return false;
        } else if (selectedType === '选择身份') {
            message.error('必须选择身份');
            return false;
        }
        // message.success('检验通过');

        let dataProps = {};   //传递到接口的参数
        dataProps.cno = cno;
        dataProps.name = name;
        dataProps.department = department;
        dataProps.type = selectedType;

        axios({
            method: 'POST',
            url: servicePath.addUser,
            data: dataProps,
            withCredentials: true
        })
            .then(
                res => {
                    if (res.data.isScuccess) {
                        message.success('文章保存成功')
                    } else {
                        message.error('文章保存失败');
                    }

                }
            )
    }
    const selectedTypeHandler = (value) => {
        setSelectType(value);
    }
    return (
        <div>
            <Form >
                <Form.Item label="编号">
                    <Input onChange={(e) => { setCno(e.target.value) }} />
                </Form.Item>
                <Form.Item label="姓名">
                    <Input onChange={(e) => { setName(e.target.value) }} />
                </Form.Item>
                <Form.Item label="学院">
                    <Input onChange={(e) => { setDepartment(e.target.value) }} />
                </Form.Item>
                <Form.Item label="身份">
                    <Select defaultValue={selectedType} size="middle" onChange={selectedTypeHandler}>
                        <Select.Option value="学生">学生</Select.Option>
                        <Select.Option value="老师">老师</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" size="middle" onClick={saveUser}> 添加用户 </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddUser;