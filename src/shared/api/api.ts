import { API_URL } from '@app/entities';
import { Octokit } from '@octokit/core';
import axios from 'axios';
import { injectable, inject } from 'inversify';
import type { ResourcePath } from './request-path';

interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, any>;
}

interface ApiOptions extends RequestOptions {
  method: 'post' | 'get' | 'delete' | 'put';
  path: ResourcePath;
}

@injectable()
export class Api {
  public octokit = new Octokit();

  constructor(@inject(API_URL) private apiUrl: string) {}

  public post<T>(
    path: ApiOptions['path'],
    data?: any,
    options?: RequestOptions,
  ): Promise<T> {
    return axios
      .post<T>(`${this.apiUrl}/${path}`, data, options)
      .then(({ data }) => data);
  }

  public get<T>(
    path: ApiOptions['path'],
    options?: RequestOptions,
  ): Promise<T> {
    return axios
      .get<T>(`${this.apiUrl}/${path}`, options)
      .then(({ data }) => data);
  }
}
