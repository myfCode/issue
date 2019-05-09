import React from 'react';
import Form from 'antd/lib/form';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Checkbox from 'antd/lib/checkbox';
// import {Row, Col, Form} from 'antd/lib/form';

const CheckboxGroup = Checkbox.Group;

/***
 * 问题描述：
 *  点击list的第一个元素的最后一个checkbox,打印出来的是list最后一个元素的item
 *  期望展示第一个元素的item
 * 
 */

class App extends React.Component {
  constructor(props) {
    super(props);
    const list = [{
      'bitCode': 0,
      'name': '通用',
      'subModules': [
        {
          'id': 1,
          'name': '内容',
          'subModules': [
            {
              'id': 2,
              'name': '课程',
              subModules: [
                {
                  id: '7',
                  name: '测试',
                  'permissions': [
                    {
                      'label': 4,
                      'value': '2的删除',
                      'position': 0,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          'id': 11,
          'name': '内容1',
          'subModules': [
            {
              'id': 21,
              'name': '课程1',
              subModules: [
                {
                  id: '71',
                  name: '测试1',
                  'permissions': [
                    {
                      'label': 41,
                      'value': '2的删除1',
                      'position': 0,
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          'id': 12,
          'name': '内容2',
          'subModules': [
            {
              'id': 22,
              'name': '课程2',
              subModules: [
                {
                  id: '72',
                  name: '测试2',
                  'permissions': [
                    {
                      'label': 42,
                      'value': '2的删除2',
                      'position': 0,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }];

    this.state = {
      list
    };
  }


  renderOptions = (list) => {
    return (
      <>
        {
          list.map((item) => (
            <Row key={item.name} type={'flex'}>
              <Col><Checkbox />{item.name}</Col>
              <Col style={{ border: '1px solid #f8f8f8', padding: '15px 15px 15px 0', flex: '1 0 auto' }}>
                {item.subModules && item.subModules.length
                  ? item.subModules.map((module) => (
                    this.renderSubmoduleItem(module, item.bitCode)
                  ))
                  : null
                }
              </Col>
            </Row>
          ))
        }
      </>
    );
  };

  renderSubmoduleItem = (item, bitCode) => {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row key={item.name} style={{ paddingLeft: '15px' }}>
        {
          item.subModules && item.subModules.length && !item.permissions
            ? <Row key={item.name}><Row><Checkbox />{item.name}</Row>
              <Row>{
                item.subModules.map((module) => this.renderSubmoduleItem(module, bitCode))
              }</Row>
            </Row>
            : null
        }
        {
          (!item.subModules || item.subModules.length === 0) && (item.permissions && item.permissions.length)
            ? <Row>
              <Checkbox />{item.name}
              {
                getFieldDecorator(`${bitCode}}`, {
                  initialValue: item.permissionsSelectedList || [],
                })(
                  <CheckboxGroup onChange={(ids) => this.checkboxGroupOnChange(ids, item)}
                                 options={item.permissions}/>,
                )
              }
            </Row>
            : null
        }
      </Row>
    );
  };

  checkboxGroupOnChange = (ids, item) => {
    console.log(item)
  };
 

  render() {
    return (
      <Form style={{ marginTop: '8px' }}>
        <h1>问题描述：</h1>
        <p>点击list的第一个元素的最后一个checkbox,打印出来的是list最后一个元素的item, 期望展示第一个元素的item</p>
        {this.renderOptions(this.state.list)}
      </Form>
    );
  }
}


export default Form.create()(App);
