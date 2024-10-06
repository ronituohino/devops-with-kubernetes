# DevOps with Kubernetes

This is a submission repository for the course
[DevOps with Kubernetes](https://devopswithkubernetes.com/)!

[DBaaS vs DIY comparison](./part3/3.06/dbaas-vs-diy.md)

## Starting up the cluster

```
gcloud container clusters create dwk-cluster --zone=europe-north1-b --cluster-version=1.29
```

## Removing the cluster

```
gcloud container clusters delete dwk-cluster --zone=europe-north1-b
```
