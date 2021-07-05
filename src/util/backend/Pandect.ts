import { EndPoint } from './index';

interface TestReq {
  Para1: string;
  Para2: number;
}
interface TestRes {
  Para1: boolean;
}

export default {
  Test: '' as EndPoint<TestReq, TestRes>,
};
