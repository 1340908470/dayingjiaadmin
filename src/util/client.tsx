import { EndPoint, jsToFormData } from "./backend";
import { message } from "antd";

export async function setJwt(jwt: string) {
  localStorage.setItem("jwt", jwt);
  localStorage.setItem("auth", "Bearer " + jwt);
}

export async function setExpiresTime(expiresIn: string) {
  localStorage.setItem(
    "expiresTime",
    parseInt((Date.now() / 1000).toString()) + Number.parseInt(expiresIn) + ""
  );
}

export function hasLogged() {
  if (
    parseInt(localStorage.getItem("expiresTime") || "0") -
      parseInt((Date.now() / 1000).toString() || "") <
    0
  ) {
    localStorage.setItem("jwt", "");
    localStorage.setItem("auth", "");
  }
  return !!localStorage.getItem("auth");
}

export function logout() {
  localStorage.setItem("jwt", "");
  localStorage.setItem("auth", "");
  history.go();
}

interface CallOptions {
  get?: boolean;
  authorization?: string;
}

/*
 * call
 * P： req
 * Q； res
 * */
export async function call<P, Q>(
  endpoint: EndPoint<P, Q>,
  para: P,
  Options?: CallOptions
): Promise<Q> {
  let fetchOptions = {
    method: "",
    headers: {} as Record<string, string>,
    body: undefined as any,
  };

  if (Options && Options.get) {
    fetchOptions.method = "GET";
    if (endpoint.includes("login")) {
      fetchOptions.headers["Authorization"] = Options?.authorization || "";
    }
  } else {
    fetchOptions.method = "POST";
    fetchOptions.body = jsToFormData(para);

    if (endpoint.includes("login")) {
      fetchOptions.headers["Authorization"] = Options?.authorization || "";
    } else {
      fetchOptions.headers["Authorization"] =
        localStorage.getItem("auth") || "";
    }
  }

  fetchOptions.headers["Accept"] = "application/vnd.dyjapi.v1+json";

  // @ts-ignore
  const resp = await fetch(`/api/` + endpoint, fetchOptions);

  if (resp.ok) {
    return Promise.resolve(resp.json());
  } else {
    message.error(resp.statusText);
    return Promise.resolve(resp.json());
  }
}
