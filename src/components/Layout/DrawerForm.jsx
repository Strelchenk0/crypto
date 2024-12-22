import React, { useState, useRef } from 'react';
import { Form, InputNumber, DatePicker, Button } from 'antd';

export default function DrawerForm({ coin, setResult }) {
  const [form] = Form.useForm();
  const { RangePicker } = DatePicker;
  const [submitted, setSubmitted] = useState(false);
  const assetRef = useRef()

  function onFinish(values) {
    const newAsset = {
      id: coin.id,
      amount: values.amount,
      price: values.price,
      date: values.date ?.$d ?? new Date(),
    }
    assetRef.current = newAsset
    setSubmitted(true)
    setResult(true); // Показуємо `Result` після успішної відправки
  }

  function amountChanger(value) {
    const price = form.getFieldValue('price');
    form.setFieldsValue({
      total: +(value * price).toFixed(2),
    });
  }

  function priceChanger(value) {
    const amount = form.getFieldValue('amount');
    form.setFieldsValue({
      total: +(amount * value).toFixed(2),
    });
  }

  return (
    <Form
      form={form}
      name="basic"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 10 }}
      style={{ maxWidth: 600 }}
      initialValues={{
        price: coin.price ? coin.price.toFixed(2) : '',
      }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            type: 'number',
            min: 0,
          },
        ]}
      >
        <InputNumber
          placeholder="Enter coin amount"
          style={{ width: '100%' }}
          onChange={amountChanger}
        />
      </Form.Item>

      <Form.Item label="Price" name="price">
        <InputNumber onChange={priceChanger} suffix="$" style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Date & Time" name="date">
        <RangePicker showTime style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label="Total" name="total">
        <InputNumber suffix="$" disabled style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add asset
        </Button>
      </Form.Item>
    </Form>
  );
}
