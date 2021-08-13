import { EndPoint, jsToFormData } from "./backend";
import { message, notification } from "antd";
import cacheStorage from "@/util/storage/cacheStorage";
import auth from "@/util/backend/auth";
import { CalendarOutlined } from "@ant-design/icons";

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

function isEmpty(a: any) {
  if (a === "") return true;
  if (a === "null") return true;
  if (a === "undefined") return true;
  if (!a && a !== 0 && a !== "") return true;
  if (Array.prototype.isPrototypeOf(a) && a.length === 0) return true;
  return Object.prototype.isPrototypeOf(a) && Object.keys(a).length === 0;
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
  if (endpoint != auth.Login && !hasLogged()) {
    history.go();
  }

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
  const storage = new cacheStorage();

  // @ts-ignore
  let body = storage.get(endpoint + JSON.stringify(para).toString());

  if (isEmpty(body) || !hasLogged()) {
    const resp = await fetch(`/api/` + endpoint, fetchOptions);

    let val = await resp.clone().json();
    // @ts-ignore
    storage.set(endpoint + JSON.stringify(para).toString(), val, 43200); // 12h

    if (resp.ok) {
      return Promise.resolve(resp.json());
    } else {
      message.error(resp.statusText);
      return Promise.resolve(resp.json());
    }
  } else {
    return Promise.resolve(body);
  }
}
