import { Form, Button, Input, NavBar, Toast } from "antd-mobile";
import styled from "./Login.module.less";
import React, { memo, useState, useEffect } from "react";
import NavBarAgain from "@/components/NavBarAgain/NavBarAgain";
import { querySmsCode, queryLogin } from "@/service/home/home.js";
import { storage } from "@/assets/utils.js";
import { useDispatch } from "react-redux";
import { feachInfoData } from "@/store/features/Info.js";
const Login = memo((props) => {
  const { navigate, usp } = props;
  console.log(props);
  const [loginForm] = Form.useForm();
  const [disabledBtn, setdisabledBtn] = useState(false);
  const [codeTime, setcodeTime] = useState(30);
  let [code, setCode] = useState();
  const dispath = useDispatch();
  let timer = null;
  // // 获取数据
  // const { Info } = useSelector(
  //   (state) => ({
  //     Info: state.infoData.Info,
  //   }),
  //   shallowEqual
  // );
  const formClick = async (values) => {
    console.log(values);
    const { mobile: phone, code } = values;
    const { data } = await queryLogin(phone, code);
    console.log(data);
    if (data.code === 0) {
      storage.set("tk", data.token);
      // useEffect(() => {
      await dispath(feachInfoData());
      console.log("123123");
      let to = usp.get("to");
      to ? navigate(to, { replace: true }) : navigate(-1);
      // }, [dispath]);
    }
  };
  const getCode = async () => {
    await loginForm.validateFields(["mobile"]);
    setdisabledBtn(true);
    timer = setInterval(() => {
      setcodeTime((prevCodeTime) => {
        if (prevCodeTime === 0) {
          clearInterval(timer);
          setdisabledBtn(false);
          return 30;
        }
        return prevCodeTime - 1;
      });
    }, 1000);
    const { data } = await querySmsCode(loginForm.getFieldValue("mobile"));
    if (data.codeText === "OK") {
      Toast.show(`验证码为${data.code}`);

      setCode(data.code);
      loginForm.setFieldValue("code", data.code);
    }
  };
  useEffect(() => {
    return () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };
  }, []);
  const validator = {
    mobile: (rule, value) => {
      if (!value?.trim()) {
        return Promise.reject("手机号不能为空");
      }
      if (!/^1[3-9]\d{9}$/.test(value)) {
        return Promise.reject("手机号格式不正确");
      }
      return Promise.resolve();
    },
  };
  return (
    <>
      <NavBarAgain title="登录/注册" />
      <Form
        className={styled.login}
        requiredMarkStyle="asterisk"
        // layout="horizontal"
        footer={
          <Button block type="submit" color="primary" size="large">
            提交
          </Button>
        }
        onFinish={formClick}
        form={loginForm}
      >
        <Form.Item
          name="mobile"
          label="手机号"
          rules={[{ validator: validator.mobile }]}
        >
          <Input placeholder="请输入手机号" />
        </Form.Item>
        <Form.Item
          name="code"
          label="短信验证码"
          extra={
            <Button
              disabled={disabledBtn}
              color="primary"
              fill="outline"
              onClick={getCode}
            >
              {disabledBtn ? `${codeTime}秒后重试` : "发送验证码"}
            </Button>
          }
          rules={[{ required: true }]}
        >
          <Input placeholder="请输入验证码" />
        </Form.Item>
      </Form>
    </>
  );
});

export default Login;
