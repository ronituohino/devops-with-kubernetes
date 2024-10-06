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

## Other things related to project

To make automatic database backups work in GKE, a Service Account token with
write privileges to the Object Store must be manually assigned to the cluster as
a secret to the `default` namespace.

```
name: gcloud-token
data:
 - TOKEN: ...
```
