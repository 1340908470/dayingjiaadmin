import { EndPoint } from './backend';
import { Simulate } from 'react-dom/test-utils';
import { message } from 'antd';
const prefix = 'localhost:8000';

interface CallOptions {
  get?: boolean;
}

/*
 * call
 * P： req
 * Q； res
 * */
export async function call<P, Q>(
  endpoint: EndPoint<P, Q>,
  para: P,
  Options?: CallOptions,
): Promise<Q> {
  const url = new URL(prefix + '/api/' + endpoint);

  let fetchOptions = {
    method: '',
    headers: {} as Record<string, string>,
    body: undefined as any,
  };

  if (Options && Options.get) {
    fetchOptions.method = 'GET';
  } else {
    fetchOptions.method = 'POST';
    fetchOptions.headers['content-type'] = 'application/json';
    fetchOptions.body = para;
  }

  let resp = await fetch(url.href, fetchOptions);

  interface RespBody {
    OK?: boolean;
    Data?: Q;
    Error?: { Kind: string; Message: string };
  }

  let body: RespBody = await resp.json();

  if (resp.ok) {
    if (body.OK) return Promise.resolve(body.Data!);
    else {
      message.error(body.Error?.Message);
      return Promise.reject(body.Error?.Kind);
    }
  } else {
    return Promise.reject(resp.status);
  }
}
